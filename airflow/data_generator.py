import pandas as pd
import random
import csv
from random import randint
import datetime
import os


types = ['car','bus','motorcyle','truck']
color = ['red','blue','pink','white','yellow','silver','green']
direction = ['left','right','straight']

speed = randint(20,60)
date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
_type = random.choice(types)
_color = random.choice(color)
_direction = random.choice(direction)

print(speed)
print(_type)
print(_color)
print(_direction)

