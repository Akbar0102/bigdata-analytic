import findspark
findspark.init('/usr/local/spark_2a/')

from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('sparktest').getOrCreate()

data = spark.read.csv('/home/hadoop1/cctv/data.csv', inferSchema=True, header=True)

typeCount = data.groupBy('type').count()

typeCount.toPandas().to_csv('~/cctv/spark_vehicle/type_df.csv')