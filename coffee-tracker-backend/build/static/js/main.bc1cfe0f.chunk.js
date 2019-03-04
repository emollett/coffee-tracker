(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t){},104:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(44),c=a.n(r),u=(a(51),a(2)),o=a(3),i=a(5),d=a(4),s=a(6),m=(a(9),a(13)),h=a.n(m),p=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).state={id:0,message:null,name:null,coffee:null,datePurchased:null,date:null},a.putDataToDB=function(e,t,n,l,r,c){c.preventDefault();for(var u=a.props.data.map(function(e){return e.id}),o=0;u.includes(o);)++o;h.a.post("/api/putData",{id:o,message:e,name:t,coffee:n,date:l,datePurchased:r})},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("form",{className:"bigPadding"},l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"Add a coffee to the database"),l.a.createElement("input",{type:"text",required:!0,onChange:function(t){return e.setState({coffee:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"Who bought the coffee?"),l.a.createElement("input",{type:"text",autoComplete:"given-name",required:!0,onChange:function(t){return e.setState({name:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"What date was it purchased?"),l.a.createElement("input",{type:"date",onChange:function(t){return e.setState({datePurchased:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"What date was it opened?"),l.a.createElement("input",{type:"date",onChange:function(t){return e.setState({date:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"Add a note about the coffee"),l.a.createElement("input",{type:"text",onChange:function(t){return e.setState({message:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("button",{onClick:function(t){return e.putDataToDB(e.state.message,e.state.name,e.state.coffee,e.state.date,e.state.datePurchased,t)}},l.a.createElement("h4",null,"Add to database"))))}}]),t}(n.Component),f=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){for(var e=this,t=[],a=0;a<this.props.purchased;a++)t.push("mug"+a);return l.a.createElement("ul",{className:"coffeeMug"},t.map(function(t){return l.a.createElement("img",{src:"./coffee.ico",alt:"icon of a coffee mug",width:"50",height:"50",key:e.props.name+t})}))}}]),t}(n.Component),E=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=[];return this.props.data.forEach(function(t){var a=e.find(function(e){return e.name===t.name});void 0!==a?a.purchased++:e.push({name:t.name,purchased:1})}),l.a.createElement("div",{className:"bigPadding"},l.a.createElement("ul",null,e.length<=0?"NO DB ENTRIES YET":e.map(function(e){return l.a.createElement("div",{className:"outputBox",key:e.name},l.a.createElement("h2",{className:"coffeeMugName"},e.name,":"),l.a.createElement(f,{purchased:e.purchased,name:e.name}))})))}}]),t}(n.Component),g=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).state={idToDelete:null,idToUpdate:null,objectToUpdate:null},a.deleteFromDB=function(e){var t=null;a.props.data.forEach(function(a){a.id==e&&(t=a._id)}),h.a.delete("/api/deleteData",{data:{id:t}})},a.updateDB=function(e,t,n){var l=null;a.props.data.forEach(function(t){t.id==e&&(l=t._id)}),h.a.post("/api/updateData",{id:l,update:{message:t,date:n}})},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"outputBoxEdit"},l.a.createElement("div",{className:"deleting"},l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"Id of item to delete"),l.a.createElement("input",{type:"text",onChange:function(t){return e.setState({idToDelete:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("button",{onClick:function(){return e.deleteFromDB(e.state.idToDelete)}},l.a.createElement("h4",null,"DELETE")))),l.a.createElement("div",{className:"editing"},l.a.createElement("div",{className:"smallPadding"},l.a.createElement("h4",null,"Id of item to update"),l.a.createElement("input",{type:"text",onChange:function(t){return e.setState({idToUpdate:t.target.value})}}),l.a.createElement("h4",null,"New message"),l.a.createElement("input",{type:"text",onChange:function(t){return e.setState({updateToApply:t.target.value})}}),l.a.createElement("h4",null,"New opened date"),l.a.createElement("input",{type:"date",onChange:function(t){return e.setState({updateToDate:t.target.value})}})),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("button",{onClick:function(){return e.updateDB(e.state.idToUpdate,e.state.updateToApply,e.state.updateToDate)}},l.a.createElement("h4",null,"UPDATE")))))}}]),t}(n.Component),v=a(25),b=a.n(v),D=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.props.data&&this.props.data.length<1?l.a.createElement("p",null,"No coffee entered yet"):(this.reversed=this.props.data.reverse(),l.a.createElement("div",{className:"smallPadding"},l.a.createElement("table",{className:"table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"ID"),l.a.createElement("th",null,"Name"),l.a.createElement("th",null,"Date Purchased"),l.a.createElement("th",null,"Date Opened"),l.a.createElement("th",null,"Coffee"),l.a.createElement("th",null,"Note"))),l.a.createElement("tbody",null,this.reversed.map(function(e){return l.a.createElement("tr",{key:e.id},l.a.createElement("td",null,e.id),l.a.createElement("td",null,e.name),l.a.createElement("td",null,"undefined"===typeof e.datePurchased||null===e.datePurchased?l.a.createElement("p",null,"No data"):l.a.createElement(b.a,{format:"DD/MM/YYYY"},e.datePurchased)),l.a.createElement("td",null,"undefined"===typeof e.date||null===e.date?l.a.createElement("p",null,"No data"):l.a.createElement(b.a,{format:"DD/MM/YYYY"},e.date)),l.a.createElement("td",null,e.coffee),l.a.createElement("td",null,e.message))})))))}}]),t}(n.Component),y=a(7),j=a(45),O=a.n(j),N=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).state={data:[],intervalIsSet:!1,hasInitialData:!1},a.getDataFromDb=function(){fetch("/api/getData").then(function(e){return e.json()}).then(function(e){a.setState({data:e.data,hasInitialData:!0})})},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getDataFromDb(),this.socket=O.a.connect(),this.socket.on("NewData",this.getDataFromDb)}},{key:"render",value:function(){return this.state.hasInitialData?l.a.createElement("div",null,l.a.createElement(E,{data:this.state.data}),l.a.createElement(y.d,null,l.a.createElement(y.b,null,l.a.createElement(y.a,null,l.a.createElement("h3",null,"Add a coffee")),l.a.createElement(y.a,null,l.a.createElement("h3",null,"See all entries")),l.a.createElement(y.a,null,l.a.createElement("h3",null,"Edit an entry"))),l.a.createElement(y.c,null,l.a.createElement(p,{data:this.state.data})),l.a.createElement(y.c,null,l.a.createElement(D,{data:this.state.data})),l.a.createElement(y.c,null,l.a.createElement(g,{data:this.state.data})))):l.a.createElement("h1",null,"Loading...")}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},46:function(e,t,a){e.exports=a(104)},51:function(e,t,a){},9:function(e,t,a){}},[[46,2,1]]]);
//# sourceMappingURL=main.bc1cfe0f.chunk.js.map