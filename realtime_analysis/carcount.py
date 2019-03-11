from pyspark.sql import SparkSession
from pyspark.sql.functions import explode
from pyspark.sql.functions import split
from pyspark.sql.types import StructField, StructType, StringType, IntegerType, TimestampType
from pyspark.sql.functions import window
import time

spark = SparkSession \
    .builder \
    .appName("carStreaming") \
    .getOrCreate()

schema = StructType([
            StructField('type', StringType(), True),
            StructField('color', StringType(), True),
            StructField('timestamp', TimestampType(), True)])


# Create DataFrame representing the stream of input lines from connection to localhost:9999
fileStreamDf = spark \
    .readStream \
    .option("header", "true") \
    .schema(schema) \
    .option("inferSchema", "true") \
    .csv("/home/hadoop/spark-streaming/data/")

aggDF = fileStreamDf.groupBy("type").count()

# windowedCounts = fileStreamDf \
#     .withWatermark("timestamp", "2 minutes") \
#     .groupBy(window(fileStreamDf.timestamp, "10 minutes", "5 minutes"), fileStreamDf.type).count()

# query = windowedCounts \
#     .writeStream \
#     .outputMode("append") \
#     .format("csv") \
#     .option("path", "/home/hadoop/spark-streaming/output") \
#     .option("checkpointLocation", "/home/hadoop/spark-streaming/checkpoint") \
#     .start()

query = aggDF \
    .writeStream \
    .queryName("aggregates") \
    .outputMode("complete") \
    .format("memory") \
    .trigger(processingTime='2 seconds') \
    .start()

while(query.isActive):
    time.sleep(3)
    spark.sql("select * from aggregates").toPandas().to_csv("/home/hadoop/spark-streaming/output/output.csv", index=False)


query.awaitTermination()

