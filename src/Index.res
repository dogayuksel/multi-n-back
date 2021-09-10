// Entry point

module Webapi = {
  module Element = {
    @set external setId: (Dom.element, string) => unit = "id"
    @set external innerHTML: (Dom.element, string) => () = "innerHTML"
    @set external className: (Dom.element, string) => () = "className"
    @send external appendChild: (Dom.element, Dom.element) => unit = "appendChild"
  }

  module Document = {
    @val external document: Dom.document = "document"
    @get external body: Dom.document => Dom.element = "body"
    @get external head: Dom.document => Dom.element = "head"
    @send external createElement: (Dom.document, string) => Dom.element = "createElement"
  }
}

open Webapi

let style = Document.document -> Document.createElement("style")
Document.document -> Document.head -> Element.appendChild(style)
style -> Element.innerHTML(AppStyles.style)

let body = {
  open Document
  document->body
}

let root = Document.document -> Document.createElement("div")

Element.appendChild(body, root)

let makeContainer = () => {
  let container = Document.document -> Document.createElement("div")
  container -> Element.className("container")

  let content = Document.document -> Document.createElement("div")
  content -> Element.className("contentContainer")

  let () = container -> Element.appendChild(content)
  let () = Document.document -> Document.body -> Element.appendChild(container)

  content
}

ReactDOMRe.render(<App />, makeContainer())
