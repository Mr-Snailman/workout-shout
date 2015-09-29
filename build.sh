target="js-frankenstein"

rm -rf $CATALINA_HOME/webapps/${target}.war $CATALIN_HOME/webapps/$target

mvn clean install
cp -r target/${target}.war $CATALINA_HOME/webapps/.

