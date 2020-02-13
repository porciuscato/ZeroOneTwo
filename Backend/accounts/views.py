# from django.shortcuts import render
# from django.shortcuts import get_object_or_404
# from django.http import HttpResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from .models import User, Schedule, Expenditure, ExchangeRates, Receipt
# from .serializers import UserstatusSerializer, ScheduleSerializer, ExchangeRatesSerializer, ExpenditureSerializer, ReceiptSerializer, UserCreationSerializer, LoginUserSerializer
# from .serializers import UserSerializer


# # 1. 회원가입 - 회원가입 함수

# @api_view(['POST'])
# @permission_classes([AllowAny, ])
# def signup(request):
#     serializer = UserCreationSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.save()
#         user.set_password(user.password)
#         user.save()
#         return Response(status=200, data={'message': '회원가입 성공'})

# # # 2. 로그인 - 로그인 함수
# @api_view(['GET'])
# def login(request):
#     # 회원가입이 되어있는 지 확인 / 되어있으면 토큰 주면 됨!
#     serializer = LoginUserSerializer(data=request.data)
#     if serializer.is_valid():
#         # 토큰을 날린다(어떻게?)
#         return Response()
#     # 안 되어있으면 에러메시지와 돌려보내!


# # 3. 유저 디테일 - 회원의 지출 기록 페이지로 연결해주는  함수
# @api_view(['GET'])
# def user_detail(request):
#     user = request.user
#     serializer = ScheduleSerializer(user)
#     return Response(serializer.data)

# # # 4. 로그아웃 - 로그아웃 함수
# # def logout(request):
# #     return 


# # # 5. 스케줄 명을 설정해야 DB를 가계부 차트에 보여준다!
# # def set_folder(request):
# #     return



from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from IPython import embed
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *


# POST
@csrf_exempt
def save_receipt(requests):
    # 영수증 큰 거 하나 저장
    data = {
        'name': 'hi', 
        'id':'id'
     }
     # 이걸로 
    return JsonResponse(data)


# POST
@csrf_exempt
def save_expenditure(requests):
    # 상세 항목 저장
    pass


# GET
@api_view(('GET',))
def get_schedule(request, pk):
    schedule = Schedule.objects.all().filter(pk=pk)
    serializer = ScheduleDetailSerializer(schedule, many=True)
    # 여기에 해당하는 모든 영수증을 가져온 뒤, 거기에 해당하는 모든 상세 항목을 가져오자
    embed()
    return Response(serializer.data)


# GET
@api_view(('GET',))
def get_receipts(requests, pk):
    receipt = Receipt.objects.all().filter(pk=pk)
    serializer = ReceiptDetialSerializer(receipt, many=True)
    return Response(serializer.data)


