#non-flexb0x way to center a div
  position absolute
  top , left 50%
  translate (-50%, -50%)

#Sticky footer

body: min-height: 100vh
content - padding-bottom.. so that the main content does not
  overlap the footer.

position: relative.
  footer {
    position: absolute
    bottom:0;
    width: 100%
}

###what is @supports (display:grid) ????

# Sticky header

header {
  padding 10 100
  box-sizing: border-box
}
nav {
  position: sticky (or static works... confirm)
  top: 50px...
 .. so then page scrolls up, the header's 50px down.

### axios just get data, why response.data
axios returns response.
then we get response.data.
instead just
const { data } = axios.get....

# for lists:
<nav><ul><li>...</nav>

#### remember
  list-style: none;
  cursor: pointer

#### degress => &deg;
<sup>&deg;C</sup> is perfect.

#### remember css filter: blur.


#### PWA
webapp manifest (icon, app name, splash, theme colors in json file)

key browser features needed/used by PWA
- service workers
- app manifest
- push notifications
- Add to Home Screen

- also streams-api is needed
The Streams API allows JavaScript to programmatically access streams of data received over the network and process them as desired by the developer.

### for PWA - checkout js13kPWA website.



### TinyPNG is a tool which
..smalliflies your image without too much loss of quality -  .. to speed the web download

#### jenkins cmd line start
/usr/local/opt/openjdk@11/bin/java -Dmail.smtp.starttls.enable=true -jar /usr/local/opt/jenkins-lts/libexec/jenkins.war --httpListenAddress=127.0.0.1 --httpPort=8080
 OR
 brew services start jenkins-lts (as service/daemon)

