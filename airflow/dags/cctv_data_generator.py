import datetime as dt

from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from airflow.operators.python_operator import PythonOperator

import pandas as pd
import random
import csv
from random import randint
import datetime
import os

types = ['car','bus','motorcyle','truck']
color = ['red','blue','pink','white','yellow','silver','green']
direction = ['left','right','straight']


def datagen():
    for i in range(randint(2,5)):
        speed = randint(20,60)
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        _type = random.choice(types)
        _color = random.choice(color)
        _direction = random.choice(direction)

        d = pd.read_csv('/home/hadoop1/cctv/data.csv')    

        fields=[date,_type,_color,_direction,speed]
        with open('/home/hadoop1/cctv/data.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(fields)
        f.close()


default_args = {
    'owner': 'airflow',
    'start_date': dt.datetime(2019, 3, 4, 16, 38, 00),
    # 'start_date': dt.datetime.now(),
    'concurrency': 1,
    'retries': 0
}

with DAG('cctv_data_generator',
         default_args=default_args,
         schedule_interval='* * * * *',
         ) as dag:
    op_data_gen = PythonOperator(task_id='data_generators',
                               python_callable=datagen)
    # op_data_gen = BashOperator(task_id='data_generator',
                             # bash_command='python /home/hadoop1/cctv/data_generator.py ')