---
layout: post
title:  "Install InfluxDB and Grafana on Raspberry Pi"
date:   2015-09-30 14:55:00
categories: [diy]
tags: [raspberry pi, influxdb, grafana]
author: gianluca troiani
---

![](/images/influxgrafanaraspi.png)

## What is a Raspberry Pi?

The Raspberry Pi is a low cost, credit-card sized computer that plugs into a computer monitor or TV, and uses a standard keyboard and mouse. It is a capable little device that enables people of all ages to explore computing, and to learn how to program in languages like Scratch and Python. It’s capable of doing everything you’d expect a desktop computer to do, from browsing the internet and playing high-definition video, to making spreadsheets, word-processing, and playing games.

What’s more, the Raspberry Pi  has the ability to interact with the outside world, and has been used in a wide array of digital maker projects, from music machines and parent detectors to weather stations and tweeting birdhouses with infra-red cameras. We want to see the Raspberry Pi being used by kids all over the world to learn to program and understand how computers work. [ [1][1] ]

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

InfluxDB requires [Go 1.5][go] or greater.

## What is Grafana?

Grafana is a leading open source application for visualizing large-scale measurement data.

It provides a powerful and elegant way to create, share, and explore data and dashboards from your disparate metric databases, either with your team or the world.

Grafana is most commonly used for Internet infrastructure and application analytics, but many use it in other domains including industrial sensors, home automation, weather, and process control. [ [3][3] ]

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
[go]: https://golang.org/
[gvm]: https://github.com/moovweb/gvm
[nodejs]: https://nodejs.org/
[grunt]: http://gruntjs.com/
[adafruit]: https://www.adafruit.com/
[adafruitnode]: https://learn.adafruit.com/node-embedded-development/installing-node-dot-js
[issue155]: https://github.com/moovweb/gvm/issues/155
[influxfromsource]: https://github.com/influxdb/influxdb/blob/master/CONTRIBUTING.md
[grafanafromsource]:http://docs.grafana.org/project/building_from_source/