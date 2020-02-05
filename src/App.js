import React,{useState} from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkIcon from '@material-ui/icons/Link';

function App(props) {
  const [text,setText] = useState('')
  const [search,setSearch] = useState('')
  const [memes,setMemes] = useState([])
  const [loading,setLoading] = useState(false)

  async function getMemes(){
    setLoading(true)
    const key = "AcnMZWPqGZLKpTql6fHMrQhIiE7QEyu8"
    const limit = 50
    let url = "https://api.giphy.com/v1/gifs/search?"
    url += "api_key="+key
    url += "&q="+text
    url += "&limit="+limit
    url += "&rating=PG-13&lang=en"
    const r = await fetch(url)  
    const body = await r.json()
    setMemes(body.data)
    setSearch(text)
    setText('')
    setLoading(false)
  }

  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">
        <Paper className="root">
          <InputBase
            placeholder="Search for Memes"
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyPress={e=> {
              if(e.key==='Enter') getMemes()
            }}
          />
          {console.log(text)}
          <IconButton  className="iconButton"  onClick={getMemes}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </header>
      <div className="content">
        <div className="memes">
          {loading?<CircularProgress/>:memes && memes.map((meme,i)=> <Meme search={search} key={i} {...meme}/>)}
        </div>
      </div>
    </div>
  );
}

function Meme({search, url, images, title},props){
  const [copytext,setCopytext] = useState("Click to Copy Link")
  if(title===""){
    title = search +" GIF"
  }
  return <div className="meme"
  onMouseLeave={()=>setCopytext("Click to Copy Link")} 
  onClick={()=>
      navigator.clipboard.writeText(url).then(function() {
      setCopytext("Link Copied!")
    }, function(err) {
      console.error('Async: Could not copy link: ', err)
    })}
  >
    <div className="copy">{copytext}</div>
    <img src={images.fixed_height.url} alt={title} />
    <div className="link"><LinkIcon fontSize="large"/></div>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;
