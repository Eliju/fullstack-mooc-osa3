(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{37:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),o=t(14),i=t.n(o),a=t(3),u=function(e){e.name;var n=e.text,t=e.onClick;return Object(r.jsx)("button",{onClick:t,children:n})},s=function(e){var n=e.p,t=e.onButtonClick;return Object(r.jsxs)("div",{children:[n.name,"  ",n.number,"  ",Object(r.jsx)(u,{name:n.name,text:"delete",onClick:t(n.name)})]})},d=function(e){var n=e.persons,t=e.filter,c=e.handleClick,o=[];if(0===String(t).trim().length)o=n;else{var i=" "+t;o=n.filter((function(e){return e.name.toUpperCase().includes(i.toUpperCase().trim())}))}return o.map((function(e){return Object(r.jsx)(s,{p:e,onButtonClick:c},e.name)}))},l=function(e){var n=e.hfs,t=e.hnamei,c=e.hnumberi,o=e.nname,i=e.nnumber;return Object(r.jsx)("form",{onSubmit:n,children:Object(r.jsx)("table",{children:Object(r.jsxs)("tbody",{children:[Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:"name:"}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{value:o,onChange:t})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:"number:"}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{value:i,onChange:c})})]}),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:Object(r.jsx)("button",{type:"submit",children:"add"})}),Object(r.jsx)("td",{})]})]})})})},f=function(e){var n=e.nf,t=e.flist;return Object(r.jsxs)(r.Fragment,{children:["Filter shown with ",Object(r.jsx)("input",{value:n,onChange:t})]})},j=function(e){var n=e.message;return""===n?null:Object(r.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},b=t(4),h=t.n(b),m="/api/persons",O={getAll:function(){return h.a.get(m).then((function(e){return e.data}))},create:function(e){return h.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}},p=function(e){var n=e.message;return""===n?null:Object(r.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},x=function(){var e=Object(c.useState)([]),n=Object(a.a)(e,2),t=n[0],o=n[1],i=Object(c.useState)(""),u=Object(a.a)(i,2),s=u[0],b=u[1],h=Object(c.useState)(""),m=Object(a.a)(h,2),x=m[0],g=m[1],v=Object(c.useState)(""),k=Object(a.a)(v,2),y=k[0],C=k[1],S=Object(c.useState)(""),w=Object(a.a)(S,2),T=w[0],B=w[1],A=Object(c.useState)(""),D=Object(a.a)(A,2),I=D[0],P=D[1],U=function(e){var n=e.substring(e.indexOf("<pre>")+5);return n=n.substring(0,n.indexOf("</pre>"))};return Object(c.useEffect)((function(){O.getAll().then((function(e){o(e)}))}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(j,{message:T}),Object(r.jsx)(p,{message:I}),Object(r.jsx)(f,{nf:y,flist:function(e){C(e.target.value)}}),Object(r.jsx)("h3",{children:"Add a new"}),Object(r.jsx)(l,{hfs:function(e){e.preventDefault();var n={name:s,number:x};if(t.findIndex((function(e){return e.name===n.name}))>=0)if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var r=t[t.findIndex((function(e){return e.name===n.name}))].id;O.update(r,n).then((function(e){var c=t.map((function(n){return n.id!==r?n:e}));o(c),B("Updated the number of ".concat(n.name)),setTimeout((function(){return B("")}),5e3),b(""),g(""),C("")})).catch((function(e){console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers),P(U(e.response.data)),setTimeout((function(){return P("")}),5e3),b(""),g("")}))}else b(""),g("");else O.create(n).then((function(e){o(t.concat(e)),B("Added ".concat(n.name)),setTimeout((function(){return B("")}),5e3),b(""),g(""),C("")})).catch((function(e){console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers),P(U(e.response.data)),setTimeout((function(){return P("")}),5e3),b(""),g("")}))},hnamei:function(e){b(e.target.value)},hnumberi:function(e){g(e.target.value)},nname:s,nnumber:x}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(d,{persons:t,filter:y,handleClick:function(e){return function(){if(window.confirm("Delete ".concat(e,"?"))){var n=t.findIndex((function(n){return n.name===e}));if(n>=0){var r=t[n].id,c=t[n].name;O.deletePerson(r).then((function(e){o(t.filter((function(e){return e.id!==r}))),B("Deleted the entry of ".concat(c)),setTimeout((function(){return B("")}),5e3)})).catch((function(e){P("Deletion of ".concat(c," failed - maybe already removed?")),setTimeout((function(){return P("")}),5e3),o(t.filter((function(e){return e.name!==c})))}))}}}}})]})};i.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.b38dd96f.chunk.js.map