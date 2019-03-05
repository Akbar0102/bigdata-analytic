import datetime as dt

from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from airflow.operators.python_operator import PythonOperator


default_args = {
    'owner': 'airflow',
    'start_date': dt.datetime(2019, 3, 4, 16, 38, 00),
    'concurrency': 1,
    'retries': 0
}

with DAG('cctv_sparkjob',
         default_args=default_args,
         schedule_interval='* * * * *',
         ) as dag:
    op_spark = BashOperator(task_id='cctv_sparkjob',
                             bash_command='python ~/cctv/cctv_sparkjob.py ')
