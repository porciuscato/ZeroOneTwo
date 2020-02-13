# import secret
import os
import sys
import urllib.request
import json
import requests
from IPython import embed
# OCR API 요청
def image_NAVER_AI(img_64):
    with open('test.txt', 'w', encoding='utf-8-sig') as f:
        f.write(img_64)
    comma_idx = img_64.find(',')
    img_64 = img_64[comma_idx+1:]
    TEMPLATE = {
        "images": [
        {
            "format": "jpg",
            "name": "medium",
            "data": img_64
        }
        ],
            "requestId": "string",
            "resultType": "string",
            "timestamp" : "1",
            "version": "V1"
    }
    transmit = json.dumps(TEMPLATE)
    client_secret = 'anZ3ZkRQU05CR2VHa1VjSVdmRGFoeFdzUUJyS0h1WnU='
    data = transmit
    url = "https://4ezihkm520.apigw.ntruss.com/custom/v1/916/682ff265d8365600d74e4adcca80dc6a59c41e236784633af6c3c37438030d33/infer"
    request = urllib.request.Request(url)
    request.add_header("X-OCR-SECRET",client_secret)
    request.add_header("Content-Type", "application/json")
    # embed()
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        fix = response_body.decode('utf-8')
        fix = json.loads(fix)
        # print(fix)
        # 결과 값 후 처리
        total = 0
        total_words = ['Total', 'total', 'TOTAL', 'AMOUNT', 'Amount', 'AMT', 'Payment', 'payment']
        empty = []
        real = []
        nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        for key, val in fix.items():                                            
            if key == "images":
                real.append('place')
                empty.append('place')
                real.append(val[0]["title"]["inferText"])
                empty.append(val[0]["title"]["inferText"])                                                             
                for k in val[0]["fields"]:
                    if k['inferText'][-1] in nums or k['inferText'][-2] in nums:
                        real.append(k['inferText'])
                        if '$' in k['inferText'] or '.' in k['inferText'] or '・' in k['inferText'] or k['inferText'][-1] == 'T' or k['inferText'][-1] == '0':
                            empty.append(k['inferText'])
    # 후 처리 한 결과 값과 그렇지 않은 결과 값의 차이 비교
        # print(real)
        if len(real) - len(empty) > 6:
            print('안 들어온 값이 많습니다. 계속 진행하시겠습니까?')
    # Key 값 후 처리    
        receipt = {}
        receipt[empty[0]] = empty[1]
        for i in range(2, len(empty)):
            if list(empty[i].split()[0])[0] in nums:
                s = empty[i].split()[0][1:]
                if list(empty[i].split()[-1])[-1] in nums or list(empty[i].split()[-1])[-1] == 'T':
                    receipt[s + ' '.join(empty[i].split()[1:-1])] = empty[i].split()[-1]
            else:
                if list(empty[i].split()[-1])[-1] in nums or list(empty[i].split()[-1])[-1] == 'T':
                    receipt[' '.join(empty[i].split()[0:-1])] = empty[i].split()[-1]
        print(receipt) 
    else:
        print("Error Code:" + rescode)
    # 파파고 번역 시작
    maerong = []
    receipt_trans = {}
    client_id = "NYfX1D8nruuEQC6_20Dk" # 개발자센터에서 발급받은 Client ID 값
    client_secret = "fN0cDTYHh8" # 개발자센터에서 발급받은 Client Secret 값
    for key, val in receipt.items():
        if key == '':
            key = 'None'
        if val == '':
            val = 'None'
        if key == '3:33TOTAL':
            key = 'TOTAL'
        encText = urllib.parse.quote(key)
        encText2 = urllib.parse.quote(val)
        data = "source=en&target=ko&text=" + encText
        data2 = "source=en&target=ko&text=" + encText2
        url = "https://openapi.naver.com/v1/papago/n2mt"
        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id",client_id)
        request.add_header("X-Naver-Client-Secret",client_secret)
        response = urllib.request.urlopen(request, data=data.encode("utf-8"))
        response2 = urllib.request.urlopen(request, data=data2.encode("utf-8"))
        rescode = response.getcode()
        rescode2 = response2.getcode()
        if(rescode==200):
            response_body = response.read()
            fix2 = response_body.decode('utf-8')
            fix2 = json.loads(fix2)
            translated = fix2["message"]["result"]["translatedText"]
            # 예외 처리 
            if translated == '바꾸다':
                translated = '거스름 돈'
            if translated == 'AMT':
                translated = '총'
            if translated == '1/015:57p전체:':
                translated = '총'
            if translated == '지불':
                translated = '총'
        if(rescode2==200):
            response_body2 = response2.read()
            fix3 = response_body2.decode('utf-8')
            fix3 = json.loads(fix3)
            translated1 = fix3["message"]["result"]["translatedText"]
            receipt_trans[translated] = translated1
        else:
            print("Error Code:" + rescode)
    return (receipt, receipt_trans)
    # print(receipt_trans)