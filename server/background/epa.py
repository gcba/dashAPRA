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


names_centenario = {
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

names_la_boca = {
    1166: 'NO',
    1167: 'NO_CAL',
    1168: 'NO2',
    1169: 'NO2_CAL',
    1170: 'NOX',
    1171: 'NOX_CAL',
    1172: 'CO',
    1173: 'CO_CAL',
    1174: 'PM10',
    1175: 'PM10_CAL',
    1176: 'WINDDIRECTION',
    1177: 'WINDDIRECTION_CAL',
    1178: 'WINDSPEED',
    1179: 'WINDSPEED_CAL',
    1180: 'TEMPERATURE',
    1181: 'TEMPERATURE_CAL',
    1182: 'RELHUMIDITY',
    1183: 'RELHUMIDITY_CAL',
    1184: 'ATMPRESSURE',
    1185: 'ATMPRESSURE_CAL',
    1186: 'GLOBALRADIATION',
    1187: 'GLOBALRADIATION_CAL',
    1188: 'RAIN',
    1189: 'RAIN_CAL',
    1190: 'OZON',
    1191: 'OZON_CAL',
    1192: 'H2S',
    1193: 'H2S_CAL',
    1194: 'SO2',
    1195: 'SO2_CAL',
    1196: 'UV-A',
    1197: 'UV-A_CAL'
}

names_cordoba = names_la_boca


def get_epa_data(sensor_id, names):
    hack_time = '2016-05-10T00:00:00-03:00'
    epa_data = api.Data.get_multiple_lasts(sensor_id, {'fecha_hasta': hack_time})
    data = {}
    if len(epa_data) > 0:
        data['time'] = sorted([d.attrs['date'] for d in epa_data])[-1]
        for d in epa_data:
            name = names[int(d.attrs['id_data_type'])]
            data[name] = d.attrs['data']
    return data


if __name__ == '__main__':
    redis_epa = redis.StrictRedis(
        host="127.0.0.1",
        port=6379,
        db=0,
        password=""
    )
    while True:
        try:
            epa_message = {
                'centenario': get_epa_data(178, names_centenario),
                'la_boca': get_epa_data(227, names_la_boca),
                'cordoba': get_epa_data(228, names_cordoba)
            }

            log(str(epa_message))
            clients = redis_epa.publish("epa_minutal", json.dumps(epa_message))
            log("%d clients" % clients)
        except Exception as e:
            log("Error\n%s" % str(e))
        time.sleep(30)
