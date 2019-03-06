import findspark
findspark.init('/usr/local/spark_2a/')

from pyspark.sql import SparkSession
from pyspark.sql.functions import explode
from pyspark.sql.functions import split
from pyspark.sql.types import StructField, StructType, StringType, IntegerType

spark = SparkSession \
    .builder \
    .appName("carStreaming") \
    .getOrCreate()

schema = StructType([
            StructField("type", StringType(), True),
            StructField("color", StringType(), True)])


# Create DataFrame representing the stream of input lines from connection to localhost:9999
fileStreamDf = spark \
    .readStream \
    .option("header", "true") \
    .schema(schema) \
    .option("inferSchema", "true") \
    .csv("/home/hadoop1/issp/spark-streaming/structured-streaming/data/")

aggDF = fileStreamDf.groupBy("type").count()

 # Start running the query that prints the running counts to the console
query = aggDF.writeStream \
    .outputMode("complete") \
    .format("console") \
    .start()

query.awaitTermination()

# query = aggDF \
#     .writeStream \
#     .format("csv") \
#     .option("path", "/home/hadoop1/issp/streaming-output/") \
#     .option("checkpointLocation", "/home/hadoop1/issp/streaming-output/checkpoint") \
#     .start()
