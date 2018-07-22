#!/bin/bash

for file in `ls good*` ; do
	enemyfile=`echo $file | sed -e 's/^good/enemy/'`
	#cp $file $enemyfile
	echo $enemyfile
	convert $file -flop -fill red -opaque black $enemyfile
done
