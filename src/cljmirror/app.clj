(ns cljmirror.app
  (:require [cljmirror.handler :as handler]
            [ring.adapter.jetty :as jetty]))

(defonce jetty-server (atom nil))

(defn start-ring []
  (reset! jetty-server
          (jetty/run-jetty handler/site {:port 3000 :join? false})))

(defn stop-ring []
  (when @jetty-server
    (.stop @jetty-server)
    (reset! jetty-server nil)))

;; (start-ring)
;; jetty-server
;; (stop-ring)
