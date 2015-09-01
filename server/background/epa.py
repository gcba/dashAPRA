#!/usr/bin/env python
# -*- coding: utf-8 -*

from api_sensores import api
import redis
import time
import sys
import datetime
import json


def log(msj):
    time_string = datetime.datetime.now().isoformat()
    msj = time_string + '  ' + msj
    sys.stdout.write("%s\n" % msj)

names = {
    1154: 'NO',
    1155: 'N2',
    1156: 'NOX',
    1157: 'CO',
    1158: 'PM10',
    1159: 'DV',
    1160: 'VV',
    1161: 'TEMP',
    1162: 'HUMEDAD',
    1163: 'PRESION',
    1164: 'RADIACION',
    1165: 'LLUVIA'
}


def sleep():
    now = datetime.datetime.now()
    time.sleep(60 - now.second)


if __name__ == '__main__':
    redis_epa = redis.StrictRedis(
        host="127.0.0.1",
        port=6379,
        db=0,
        password=""
    )
    while True:
        try:
            epa_data = api.Data.get_last(178, {'limit': 12})
            epa_message = {'time': epa_data[0].attrs['date']}
            for d in epa_data:
                name = names[d.attrs['id_data_type']]
                epa_message[name] = d.attrs['data']
            log(str(epa_message))
            clients = redis_epa.publish("epa_minutal", json.dumps(epa_message))
            log("%d clients" % clients)
        except Exception as e:
            log("Error\n%s" % str(e))
        sleep()
