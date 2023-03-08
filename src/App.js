
import React , {useState,useEffect} from  'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [term, setterm] = useState('')
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
    .then(res => res.json()
    .then(data=> {
      setImages(data.hits);
     
      setisLoading(false);
    })
    .catch(err => console.log(err))
    )
  
    
  }, [term])
  
  return (
   <div className="container mx-auto">
    <ImageSearch searchText={(text)=>setterm(text)}/>
    {!isLoading && images.length === 0 &&  <h1 className="text-center text-6xl mt-32 mx-auto">No images found</h1> }
    {isLoading ? <h1 className="text-center text-6xl mt-32 mx-auto">loading........</h1>:
    <div className="grid grid-cols-3 gap-3">
      {
        images.map(image =>{
 return <ImageCard key={image.id} image={image}/>
        })
      }
    </div>
}
   </div>
    );


}

export default App;
