(ns cljmirror
  (:use compojure.core)
  (:require [ring.middleware.json :as json]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [hiccup.page :as p]))

(defn page []
  (p/html5
   (p/include-js "js/jquery-1.9.1.min.js"
                 "js/codemirror-compressed.js"
                 "js/cljmirror.js")
   (p/include-css "css/codemirror.css"
                  "css/cljmirror.css"
                  )
   [:h1 "Try Clojure"]
   [:div#console]))

(defn do-eval [code]
  (let [s (java.io.StringWriter.)]
    (binding [*out* s
              *ns* (find-ns 'user)] ;; TODO - one ns per session
      (try
        {:body {:result (->> code :code read-string eval
                             (#(if (nil? %) "nil" (str %))))
                :out (str s)}}
        (catch Exception e
          {:body {:error (str e)}})))))

(defroutes app-routes
  (GET "/" [] (page))
  (POST "/eval" {params :params} (do-eval params))
  (route/resources "/")
  (route/not-found "Not Found"))

(def site
  (-> (handler/api app-routes)
      (json/wrap-json-params)
      (json/wrap-json-response)))
