(defproject cljmirror "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring/ring-jetty-adapter "1.2.0"]
                 [ring/ring-json "0.2.0"]
                 [compojure "1.1.5"]
                 [hiccup "1.0.4"]
                 [clojail "1.0.6"]]
  :profiles {:dev {:dependencies [[org.clojure/tools.namespace "0.2.4"]]
                   :source-paths ["dev"]}}
  :plugins [[lein-ring "0.8.3"]]
  :ring {:handler cljmirror/site}
  :repl-options {:init (user/go)})
