(this.webpackJsonpgamedb=this.webpackJsonpgamedb||[]).push([[0],{40:function(e,t,a){e.exports=a(69)},45:function(e,t,a){},46:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),l=a.n(c),s=(a(45),a(46),a(10)),i=a(9);var m=function(){return r.a.createElement("nav",{className:"navbar navbar-dark bg-dark"},r.a.createElement("div",{className:"container"},r.a.createElement(s.b,{to:"/",className:"navbar-brand center"},"GameDB")))},o=a(16),u=a(17),d=a(19),g=a(18),p=a(20),E=a(11);var h=function(e){var t=e.game;return r.a.createElement("div",{className:"card shadow-lg",id:"card"},r.a.createElement("div",{className:"card-image-top z-depth-5"},r.a.createElement("img",{src:t.background_image,alt:t.slug})),r.a.createElement("div",{className:"card-body"},r.a.createElement("span",{className:"card-title"},r.a.createElement("b",null,r.a.createElement("b",null,t.name))),r.a.createElement("div",{className:"card-content"},r.a.createElement("p",null,r.a.createElement("b",null,t.ratings_count," people rated")),r.a.createElement("p",null,r.a.createElement("b",null,"Rating: ",t.rating)))),r.a.createElement("img",{src:t.background_image,alt:t.slug,id:"bg-image"}))};var f=function(e){var t=e.games;return r.a.createElement("div",{className:"game-list container"},r.a.createElement("div",{className:"row row-cols-4"},t.map((function(e){return r.a.createElement("div",{className:"col top-buffer",key:e.id},r.a.createElement(s.b,{to:"/game/"+e.id,className:"text-decoration-none"},r.a.createElement(h,{game:e})))}))))},b=a(21),v=a.n(b),N=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={pageId:1,gameName:""},a.incrementPage=function(){a.setState({pageId:a.state.pageId+1},(function(){return a.componentDidMount()}))},a.decrementPage=function(){a.setState({pageId:a.state.pageId-1},(function(){return a.componentDidMount()}))},a.handleChange=function(e){e.target.value>0&&a.setState({pageId:e.target.valueAsNumber})},a.handlePageNumberSubmit=function(e){e.preventDefault(),a.componentDidMount()},a.handleQuerySubmit=function(e){e.preventDefault();var t=document.getElementById("searchText").value;a.setState({pageId:1,gameName:t},(function(){return a.componentDidMount()}))},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"checkPageNumberForButtons",value:function(){if(1===this.state.pageId){var e=document.getElementById("decrement");e.setAttribute("disabled","disabled")}else(e=document.getElementById("decrement")).removeAttribute("disabled")}},{key:"componentDidMount",value:function(){""!==this.state.gameName?this.props.fetchFromSearch(this.state.gameName,this.state.pageId):this.props.fetch(this.state.pageId),this.checkPageNumberForButtons()}},{key:"render",value:function(){var e=this.props.games,t=this.props.searchResults;return r.a.createElement("div",{className:"homepage container-fluid top-buffer",id:"fadein"},r.a.createElement("form",{className:"center form-check-inline",onSubmit:this.handleQuerySubmit},r.a.createElement("label",{className:"mb-0 mr-sm-2 text-white"},"Search:"),r.a.createElement("input",{type:"text",id:"searchText",className:"form-control"}),r.a.createElement("button",{className:"btn btn-dark mx-2"},"Submit")),t.results&&r.a.createElement(f,{games:t.results})||e.results&&r.a.createElement(f,{games:e.results}),r.a.createElement("form",{className:"center",onSubmit:this.handlePageNumberSubmit},r.a.createElement("label",{className:"mb-0 mr-sm-0 top-buffer"},"Page number: ",this.state.pageId),r.a.createElement("input",{type:"number",id:"pageNumber",onChange:this.handleChange,className:"form-control"}),r.a.createElement("button",{className:"btn btn-dark"},"Submit")),r.a.createElement("button",{className:"btn btn-outline-primary btn-lg",id:"decrement",onClick:this.decrementPage},"Previous Page"),r.a.createElement("button",{className:"btn btn-outline-secondary btn-lg",id:"increment",onClick:this.incrementPage},"Next Page"))}}]),t}(n.Component),y=Object(E.b)((function(e){return{games:e.games,searchResults:e.searchResults}}),(function(e){return{fetch:function(t){return e(function(e){return function(t,a){v.a.get("https://api.rawg.io/api/games?page=".concat(e)).then((function(e){return t({type:"FETCH_GAMES",games:e.data})})).catch((function(e){t({type:"FETCH_ERROR",err:e})}))}}(t))},fetchFromSearch:function(t,a){return e(function(e,t){return function(a,n){v.a.get("https://api.rawg.io/api/games?page_size=40&page=".concat(t,"&search=").concat(e)).then((function(e){return a({type:"FETCH_SEARCHED_GAME",games:e.data})})).catch((function(e){a({type:"FETCH_SEARCHED_GAME_ERROR",err:e})}))}}(t,a))}}}))(N),k=function(e){function t(){return Object(o.a)(this,t),Object(d.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.fetch(this.props.match.params.id)}},{key:"checkForVideo",value:function(e){if(e.clip&&null!=e.clip)return r.a.createElement("video",{controls:!0,src:e.clip.clip,muted:!0})}},{key:"alternativeNames",value:function(e){if(e.alternative_names&&e.alternative_names.length>0)return r.a.createElement("p",null,"Alternative names:",e.alternative_names.map((function(e){return" "+e})).join(", "))}},{key:"metacritic",value:function(e){if(null!=e.metacritic)return r.a.createElement("div",{className:"square text-white font-weight-bold"},r.a.createElement("label",null,e.metacritic))}},{key:"developers",value:function(e){if(e.developers&&e.developers.length>0)return r.a.createElement("p",null,"Developers:",e.developers.map((function(e){return" "+e.name})).join(", "))}},{key:"ratings",value:function(e){if(e.ratings&&e.ratings.length>0)return r.a.createElement("p",null,e.ratings.map((function(e){return r.a.createElement("li",{className:"list-group-item text-capitalize p-2",key:e.id},e.title,r.a.createElement("br",null),"Rated: ",e.count," || ",e.percent,"%")})))}},{key:"render",value:function(){var e=this.props.game;return r.a.createElement("div",{className:"detail-card container-xl-1",id:"fadein"},r.a.createElement("div",{className:"row row-cols-2"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"detail-card-image"},r.a.createElement("img",{src:e.background_image,alt:e.slug})),r.a.createElement("div",{className:"detail-video-clip top-buffer"},this.checkForVideo(e))),r.a.createElement("div",{className:"detail-card-content col jumbotron"},r.a.createElement("p",{className:"detail-card-title font-weight-bold display-4"},e.name),this.metacritic(e),r.a.createElement("div",{id:"alternative-name"},this.alternativeNames(e)),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("p",null,"Released: ",e.released),r.a.createElement("div",{className:"container text-justify",id:"detail-card-description"},e.description_raw),r.a.createElement("div",{className:"developers font-weight-bold top-buffer"},this.developers(e)),r.a.createElement("p",{className:"ratings text-left"},"Ratings:"),r.a.createElement("ul",{className:"ratings list-group float-left list-unstyled"},this.ratings(e)))))}}]),t}(n.Component),R=Object(E.b)((function(e){return{game:e.game}}),(function(e){return{fetch:function(t){return e(function(e){return function(t,a){v.a.get("https://api.rawg.io/api/games/".concat(e)).then((function(e){return t({type:"FETCH_GAME",games:e.data})})).catch((function(e){t({type:"FETCH_GAME_ERROR",err:e})}))}}(t))}}}))(k);var _=function(){return r.a.createElement(s.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(m,null),r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/",component:y}),r.a.createElement(i.a,{path:"/game/:id",component:R}))))},F=a(13),C=a(39),O=a(22),j={games:[{id:"1",title:"First title",content:"pdgphkosfksodfkods"},{id:"2",title:"Second title",content:"sodgodkfos"},{id:"3",title:"Third title",content:"idjosd"}],game:{},searchResults:[]},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_GAMES":return console.log("Fetched games",t.games),Object(O.a)({},e,{games:t.games,searchResults:[]});case"FETCH_ERROR":return console.log("Fetch games error",t.err),e;case"FETCH_GAME":return console.log("Fetched game",t.games),Object(O.a)({},e,{game:t.games});case"FETCH_GAME_ERROR":return console.log("Fetch games error",t.err),e;case"FETCH_SEARCHED_GAME":return console.log("Fetched searched game",t.games),Object(O.a)({},e,{searchResults:t.games,games:[]});case"FETCH_SEARCHED_GAME_ERROR":return console.log("Fetch searched games error",t.err),e;default:return e}},A=Object(F.c)(S,Object(F.a)(C.a));l.a.render(r.a.createElement(E.a,{store:A},r.a.createElement(_,null)),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.3294e9c0.chunk.js.map