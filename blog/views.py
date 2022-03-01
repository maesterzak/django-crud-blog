from django.shortcuts import render
from .models import *
from django.shortcuts import render
import os

# Create your views here.

def home(request):
    message = "meal"
    
    posts = Post.objects.all()
    context = {"message": message, "posts":posts}
    return render(request, 'index.html', context)


def post_detail(request, pk):
    post = Post.objects.get(id=pk)
    context = {"post":post}
    return render(request, 'post_detail.html', context)


def dashboard(request):
    posts = Post.objects.all()
    if request.method == "POST":
        procs = request.POST.get("process")
        if procs == "post_delete":
            id = request.POST.get("id")
            w = Post.objects.get(id = id)
            w.delete()
            
        elif procs == "form_submit":    
            formId = request.POST.get("formId")
            image = request.FILES.get("image")
            title = request.POST.get("title")
            body = request.POST.get("body")
            print('ooo', body) 
            published = request.POST.get("published")
            if published == "true":
                published = True
            elif published == "false":
                published = False    
            if formId == "form1":
                if title !='' and body !='':
                    print('image', image)
                    post = Post.objects.create(title=title, body=body, published=published, image=image)
                    post.save()
                else:
                    print('form is empty')    
            elif formId == "form2":
                id = request.POST.get("id")
                x = Post.objects.filter(id = id)
                z = Post.objects.get(id = id)
                if image == None and title !='' and body !='':
                    
                    x.update(title=title, body=body, published=published)
                elif title !='' and body !='':
                    print('www',z.image)
                    if z.image:
                        image_path = z.image.path 
                        if image_path:
                            print("yyy")
                            os.remove(image_path)
                           
                    z.title = title
                    z.body = body
                    z.published = published
                    z.image = image
                    z.save()

                
            else:
                print("Invalid value for form ID")
        
    context = {"posts":posts}    
    return render(request, 'dashboard.html', context)    