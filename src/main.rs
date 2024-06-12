use actix_web::{web, App, HttpResponse, HttpServer, Responder};

// Define a handler function
async fn greet() -> impl Responder {
    HttpResponse::Ok().body("Hello, Actix!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(greet)) // Configure the route
    })
    .bind("127.0.0.1:8080")? // Bind to an address and port
    .run()
    .await
}