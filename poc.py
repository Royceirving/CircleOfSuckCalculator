#poc.py - proof of concept

def test_cos(data):

    TOP = list(data.keys())[0]

    def foo(key,layers_left,visited):
        #print(key,layers_left)
        
        elements = data[key]
        if(layers_left <= 0 and key == TOP):
            return []
        elif(layers_left > 0):
            for new_key in elements:
                if(new_key == TOP and layers_left > 1 or new_key in visited):
                    continue
                res = foo(new_key,layers_left-1,visited+[new_key])
                if(res != None):
                    return res+[new_key]
        return None

    return foo(TOP,len(data),[])
