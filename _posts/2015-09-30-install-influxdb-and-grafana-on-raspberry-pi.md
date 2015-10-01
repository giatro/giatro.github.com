---
layout: post
title:  "Install InfluxDB and Grafana on Raspberry Pi"
date:   2015-09-30 14:55:00
categories: [diy]
tags: [raspberry pi, influxdb, grafana]
author: gianluca troiani
---

Many Internet of things projects are based on the Raspberry Pi and many of these need to save time series data on a database and need an interface to view stored data.

InfluxDB and Grafana are the the perfect tools to do the job.

![](/images/influxgrafanaraspi.png)

<!--more-->

## What is a Raspberry Pi?

The Raspberry Pi is a low cost, credit-card sized computer capable of doing everything you’d expect a desktop computer to; what’s more, the Raspberry Pi has the ability to interact with the outside world using the 0.1" spaced 40-pin GPIO header.

Given the size and the GPIO access (27 GPIO, UART, I2C, SPI as well as 3.3 and 5V sources), the Raspberry Pi has been used as embedded computer in a wide array of digital maker and internet of things, projects. [ [1][1] ].

The Raspberry Pi model used in this guide is [Raspberry Pi 2 Model B][pi2b] with [Raspbian][raspbian].

![Raspberry Pi 2 Model B](/images/pi2b.jpg) [Image courtesy of Adafruit][pi2bimgcc], ([CC BY-SA 3.0][cc]).

## What is InfluxDB?

InfluxDB is a time series, metrics, and analytics database. It’s written in Go and has no external dependencies.

InfluxDB is targeted at use cases for DevOps, metrics, sensor data, and real-time analytics. [ [2][2] ]

Key Features: [ [2][2] ]

* SQL-like query language
* HTTP(S) API for data ingestion and queries
* Built-in support for other data protocols such as collectd
* Store billions of data points
* Tag data for fast and efficient queries
* Database-managed retention policies for data
* Built in management interface
* Aggregate on the fly
* Store and query hundreds of thousands of series, filtering by tags
* Merge multiple series together

![Example of InfluxDD Admin page](/images/InfluxDBAdmin.png)

InfluxDB requires [Go 1.5][go] or greater.

## What is Grafana?

Grafana is a leading open source application for visualizing large-scale measurement data.

It provides a powerful and elegant way to create, share, and explore data and dashboards from your disparate metric databases, either with your team or the world.

Grafana is most commonly used for Internet infrastructure and application analytics, but many use it in other domains including industrial sensors, home automation, weather, and process control. [ [3][3] ]

![Example of a Grafana dashboard](/images/grafanaexample.png)

Grafana requires [Go 1.4][go] and [NodeJS][nodejs].

## Install requirements

### Install Go

InfluxDB requires Go 1.5 but to install Go 1.5 you need Go 1.4 (see [this issue][issue155]).

[GVM][gvm] provides an interface to manage Go versions.

{% highlight sh %}

# requirements
sudo apt-get install curl git mercurial make binutils bison gcc build-essential
# install gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
# restart your terminal session
# install go
gvm install go1.4 
gvm use go1.4 
export GOROOT_BOOTSTRAP=$GOROOT 
gvm install go1.5
gvm use go1.5 --default

{% endhighlight %}

### Install NodeJS

Grafana requires [NodeJS][nodejs] to build the front-end assets using [Grunt][grunt].

[Adafruit][adafruit] has a good [guide about NodeJS on Raspberry Pi][adafruitnode].

{% highlight sh %}

# add the apt.adafruit.com package repository to your Pi
curl -sLS https://apt.adafruit.com/add | sudo bash
# install node.js using apt-get
sudo apt-get install node

{% endhighlight %}

### Set up environment

{% highlight sh %}

mkdir $HOME/gocodez
echo "export GOPATH=$HOME/gocodez" >> $HOME/.bashrc
source $HOME/.bashrc

{% endhighlight %}

## Install InfluxDB

Based on "[Contributing to InfluxDB][influxfromsource]".

{% highlight sh %}

# getting the source
go get github.com/influxdb/influxdb
# install
cd $GOPATH/src/github.com/influxdb
go get -u -f -t ./...
go build ./...
# start influxdb
$GOPATH/bin/influxd

{% endhighlight %}

## Install Grafana

Based on "[Building Grafana from source][grafanafromsource]".

{% highlight sh %}

# getting the source
go get github.com/grafana/grafana
# building the backend
cd $GOPATH/src/github.com/grafana/grafana
go run build.go setup
$GOPATH/bin/godep restore
go run build.go build
# build the front-end assets
npm install
sudo npm install -g grunt-cli
grunt
# start grafana
$GOPATH/bin/grafana-server
{% endhighlight %}

## Start Your Engines!

{% highlight sh %}

# start influxdb
$GOPATH/bin/influxd
# start grafana
$GOPATH/bin/grafana-server

{% endhighlight %}

## External links

1. [What is a Raspberry Pi?][1]
2. [Overview \| InfluxDB][2]
3. [About Grafana][3]


[1]: https://www.raspberrypi.org/help/what-is-a-raspberry-pi/
[2]: https://influxdb.com/docs/v0.9/introduction/overview.html
[3]: http://docs.grafana.org/
[cc]: http://creativecommons.org/licenses/by-sa/3.0/
[pi2b]: https://www.raspberrypi.org/products/raspberry-pi-2-model-b/
[pi2bimgcc]: https://learn.adafruit.com/assets/22828
[raspbian]: https://www.raspberrypi.org/downloads/raspbian/
[raspiiot]: https://www.raspberrypi.org/blog/tag/internet-of-things/
[go]: https://golang.org/
[gvm]: https://github.com/moovweb/gvm
[nodejs]: https://nodejs.org/
[grunt]: http://gruntjs.com/
[adafruit]: https://www.adafruit.com/
[adafruitnode]: https://learn.adafruit.com/node-embedded-development/installing-node-dot-js
[issue155]: https://github.com/moovweb/gvm/issues/155
[influxfromsource]: https://github.com/influxdb/influxdb/blob/master/CONTRIBUTING.md
[grafanafromsource]:http://docs.grafana.org/project/building_from_source/