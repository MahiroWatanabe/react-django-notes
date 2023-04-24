from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

def getNotesList(request):
    # 取得したNoteオブジェクトを更新したのが遅い順（大きい順、降順）
    # に並び替える
    notes = Note.objects.all().order_by('-updated')
    # many=Falesの場合はnotesが単一のオブジェクトでなければならない
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

def createNote(request):
    data = request.data
    note = Note.objects.create(body=data['body'])
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)
    
def getNoteDetail(request,pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id=pk)
    # instanceに指定するのが更新前データ、dataにしていするのが更新後データ
    # データベースに保存するには、.sava()メソッドを実行する
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

def deleteNote(request,pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')