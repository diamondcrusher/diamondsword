#!/bin/bash

for file in `ls miner* spearman* archer* swordsman* giant*` ; do
	goodfile=good-$file
	mv $file $goodfile
	echo $goodfile
done
