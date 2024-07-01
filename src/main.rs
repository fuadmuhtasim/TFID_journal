use actix_web::{web, App, HttpResponse, HttpServer, Responder};

// Define a handler function
async fn greet() -> impl Responder {
    HttpResponse::Ok().body("Hello, Actix!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(actix_files::Files::new("/", "./static").index_file("index.html"))
            
    })
    .bind("127.0.0.1:8080")? // Bind to an address and port
    .run()
    .await
}