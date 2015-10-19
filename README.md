# The Coffee Compass Mobile App

The Coffee Compass mobile app is for helping coffee lovers (addicts?) find shops recommended by the editors at [The Coffee Compass] and also for reviewing content on [The Coffee Compass].

While the app is specifically for [The Coffee Compass], it can serve as a template for miscellaneous location reviews powered by [Wordpress].

### Technology
The Coffee Compass mobile app is an [Ionic] app, which leverages [AngularJS], the [Apache Cordova] framework, and  builds natively to iOS and Android devices. We're using the Wordpress plugin [JSON API] to expose our site as a RESTful web service which serves up the content for the app via HTTP calls. We are tagging our posts via the [WP Geo] plugin in order to add geotagging metadata post fields. We've built a custom PHP controller for the [JSON API] plugin that pulls posts by the tagged geolocation data.

### Installation

You need the [Ionic] framework, (along with [NPM] and [Bower]). You'll want to check out [Ionic: Getting Started] if you haven't already.

### Running

In the browser:
```sh
$ ionic serve
```

In the emulators:
```sh
$ ionic emulate ios
```
```sh
$ ionic emulate android
```

### Building
```sh
$ ionic build ios
```

### Development

Currently developing...


[The Coffee Compass]: <http://www.thecoffecompass.com>
[Ionic]: <http://ionicframework.com>
[Apache Cordova]: <https://cordova.apache.org>
[Ionic: Getting Started]: <http://ionicframework.com/getting-started/>
[AngularJS]: <https://angularjs.org>
[NPM]:<https://www.npmjs.com>
[Bower]:<http://bower.io>
[Wordpress]:<https://wordpress.org>
[JSON API]: <https://wordpress.org/plugins/json-api/>
[WP Geo]: <https://wordpress.org/plugins/wp-geo/>
![](/resources/icon.png?raw=true)
