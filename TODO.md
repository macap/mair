## Todo list

### MVP

- [x] style "you are now" component
- [x] style timeline
- [x] currency converter to sum total
- [x] view details modal with list of flights and link to book
- [x] style start form
- [x] basic style for style home page

### Bugfixes

- [x] NaN on total sum
- [] Validate the app using other locale settings (TZ: UTC | GMT +3)
  https://www.npmjs.com/package/timezoned-date
  https://www.npmjs.com/package/mockdate
- [] content shift on each flight load

### cleanup

- [x] integration tests for critical stuff
- [x] cleanup project and component structure a bit
- [ ] visual regression testing (screenshot comprasion)
  - https://github.com/americanexpress/jest-image-snapshot
  - or per component: https://github.com/lost-pixel/lost-pixel + ladle/storybook?
- [] redux
- [] rwd
- [] icons as svg sprites https://benadam.me/thoughts/react-svg-sprites/
- [] json data rendered: 114KB(airport)+133KB(map) in bundle :/
- [] replace react-query with rtk-query once redux is set

### improvements

- [x] landing page content
      animation: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset
      https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/#line-drawing-animation
- [] currency selector
- [] i18n | lang selector
- [] change the airport youre currently on
- [] share url
- [] destinations info - transfer price and time to city, hotel price
- [] improve how aiport details are managed - names/code are included in flight request, but we need all airports for map (lat,lng) and origin selection (autocomplete/search may be enough)
- [] sort retults
- [] if its first flight you can change arrival day back
- [] reset +days on flight removal
- [] save trip and/or branch it

### map

- [] higlight country you are now in
- [] Save/Load itineraries
- [] arrows on map connections
- [] highlight routes on map
- [] present connections to be selected on map while hovered

## other requests:

https://www.postman.com/hakkotsu/workspace/ryanair/request/5803268-0d38bf98-65c3-4d3a-bc9e-20180819e53b

### random ideas

- [] scraper biletyczarterowe.r.pl
- [] push notifications
- [] research w6 api
