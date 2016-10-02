#ROUTE FINDER:

##To execute this program, follow this steps:

1. cd /path/to/unzipped/route-puzzle

2. ./dockerRun.sh /path/to/unzipped/route-puzzle   (needs the absolute path for installing dependencies correctly)

To change program parameters just edit the dockerRun.sh file according to the parameters below

Program Options:

    -m, --map      Provide a valid JSON containing puzzle map
    -f, --from     A string denoting the starting point id
    -i, --items    Items to collect (separated by spaces)
