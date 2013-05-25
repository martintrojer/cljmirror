(ns cljmirror.handler
  (:use compojure.core)
  (:require [ring.middleware.json :as json]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [hiccup.page :as p]
            [hiccup.element :as e]))

(defn page []
  (p/html5
   (p/include-js "js/jquery-1.9.1.min.js"
                 "js/codemirror-compressed.js"
                 ;;"js/SoleMirror.js"
                 "js/cljmirror.js")
   (p/include-css "css/codemirror.css"
                  ;;"css/SoleMirror.css"
                  )
   [:h1 "Try Clojure"]
   [:div#console]))

(defn do-eval [code]
  (let [res (-> code :code read-string eval)]
    (println (.trim (:code code)) "->" res)
    {:body {:result (str res)}}))

(defroutes app-routes
  (GET "/" [] (page))
  (POST "/eval" {params :params} (do-eval params))
  (route/resources "/")
  (route/not-found "Not Found"))

(def site
  (-> (handler/api app-routes)
      (json/wrap-json-params)
      (json/wrap-json-response)))
