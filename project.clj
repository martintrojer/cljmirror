(defproject cljmirror "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring "1.1.8"]
                 [ring/ring-jetty-adapter "1.1.8"]
                 [ring/ring-json "0.2.0"]
                 [compojure "1.1.5"]
                 [hiccup "1.0.3"]
                 [clojail "1.0.6"]]
  :plugins [[lein-ring "0.8.3"]]
  :ring {:handler cljmirror.handler/site}
  :repl-options {:init-ns cljmirror.app
                 :init (cljmirror.app/start-ring)})
