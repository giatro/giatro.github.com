---
layout: post
title:  "Install InfluxDB and Grafana on Raspberry Pi"
date:   2015-09-30 14:55:00
categories: [diy]
tags: [raspberry pi, influxdb, grafana]
author: gianluca troiani
---

## What is a Raspberry Pi?

The Raspberry Pi is a low cost, credit-card sized computer that plugs into a computer monitor or TV, and uses a standard keyboard and mouse. It is a capable little device that enables people of all ages to explore computing, and to learn how to program in languages like Scratch and Python. It’s capable of doing everything you’d expect a desktop computer to do, from browsing the internet and playing high-definition video, to making spreadsheets, word-processing, and playing games.

What’s more, the Raspberry Pi  has the ability to interact with the outside world, and has been used in a wide array of digital maker projects, from music machines and parent detectors to weather stations and tweeting birdhouses with infra-red cameras. We want to see the Raspberry Pi being used by kids all over the world to learn to program and understand how computers work. [ [1][1] ]

## What is InfluxDB

InfluxDB is a time series, metrics, and analytics database. It’s written in Go and has no external dependencies. That means once you install it there’s nothing else to manage (such as Redis, ZooKeeper, Cassandra, HBase, or anything else).

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

## What is Grafana

Grafana is a leading open source application for visualizing large-scale measurement data.

It provides a powerful and elegant way to create, share, and explore data and dashboards from your disparate metric databases, either with your team or the world.

Grafana is most commonly used for Internet infrastructure and application analytics, but many use it in other domains including industrial sensors, home automation, weather, and process control.

Grafana requires [Go 1.4][go] and [NodeJS][nodejs].

## Install requirements

### Install Go

[GVM][gvm] provides an interface to manage Go versions.

InfluxDB requires Go 1.5 but to install Go 1.5 you need Go 1.4 (see [this issue][issue155]).

{% gist giatro/4131c6eeefaecff8dea0 install_go.sh %}

### Install NodeJS

[Adafruit][adafruit] has a good [guide about NodeJS on Raspberry Pi][adafruitnode].

{% gist giatro/4131c6eeefaecff8dea0 install_nodejs.sh %}

## Install InfluxDB

{% gist giatro/4131c6eeefaecff8dea0 install_influxdb.sh %}

## Install Grafana

...


## External links

1. [https://www.raspberrypi.org/][1]
2. [https://influxdb.com/docs/v0.9/introduction/overview.html][2]


[1]: https://www.raspberrypi.org/
[2]: https://influxdb.com/docs/v0.9/introduction/overview.html
[go]: https://golang.org/
[gvm]: https://github.com/moovweb/gvm
[nodejs]: https://nodejs.org/
[adafruit]: https://www.adafruit.com/
[adafruitnode]: https://learn.adafruit.com/node-embedded-development/installing-node-dot-js
[issue155]: https://github.com/moovweb/gvm/issues/155