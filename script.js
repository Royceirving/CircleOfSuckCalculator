
function parse_file(event)
{
    var reader = new FileReader()
    reader.onload = function(event){
        if(event.target.result != undefined)
        {
            var obj = JSON.parse(event.target.result);
            var data = calculate_circle_of_suck(obj);
            fill_cos(data);
        }
    }
    if(event.target.files.length > 0)
    {
        reader.readAsText(event.target.files[0]);
    }
}


function calculate_circle_of_suck(json_obj)
{
    keys = Object.keys(json_obj);
    var TOP = keys[0]

    function foo(key,layers_left,visited)
    {
        var elements = json_obj[key];
        if(layers_left <= 0 && key === TOP)
        {
            return []
        }
        else if(layers_left > 0)
        {
            for(i in elements)
            {
                var new_key = elements[i];
                if((new_key === TOP && layers_left > 1) || visited.includes(new_key))
                {
                    continue;
                }
                var result = foo(new_key,layers_left-1,visited.concat(new_key))
                if(result != null)
                {
                    return result.concat(new_key);

                }
            }
        }
        return null
    }

    var result = foo(TOP,keys.length,[])
    if(result != null)
    {
        return result.reverse();
    }
    return []
}

function fill_cos(data)
{
    var cos_div = document.getElementById("cos_div");
    cos_div.innerHTML = "";

    for(let i = 0; i < data.length; i++)
    {
        var ele = document.createElement('p');
        if(i >= data.length - 1)
        {
            ele.innerText = data[i] + " > " + data[0];
        }
        else
        {
            ele.innerText = data[i] + " > " + data[i+1];
        }
        cos_div.appendChild(ele);
    }
}

// Im a javascript novice who also does little to no datastructures and algorithms work, I'm sure this could be done
//  better and more efficient, though I created the algorithm in a few hours to make a meme for my fantasy football league.