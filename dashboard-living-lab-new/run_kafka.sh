#!/bin/bash

tab="--tab"
cmd1="bash -c '/home/hadoop/bigdata/kafka_2.12-2.1.1/bin/zookeeper-server-start.sh  /home/hadoop/bigdata/kafka_2.12-2.1.1/config/zookeeper.properties';bash"
cmd2="bash -c '/home/hadoop/bigdata/kafka_2.12-2.1.1/bin/kafka-server-start.sh /home/hadoop/bigdata/kafka_2.12-2.1.1/config/server.properties';bash"
foo=""

foo+=($tab -e "$cmd1")
foo+=($tab -e "$cmd2")

gnome-terminal "${foo[@]}"

exit 0
