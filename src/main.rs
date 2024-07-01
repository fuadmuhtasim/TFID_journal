use actix_web::{web, App, HttpServer, HttpRequest, HttpResponse, Responder};
use actix_files;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct LoginForm {
    email: String,
    password: String,
}

async fn login_form(form: web::Form<LoginForm>, req: HttpRequest) -> impl Responder {
    println!("Received login request: {:?}", req);

    if let Some(content_type) = req.headers().get("content-type").and_then(|v| v.to_str().ok()) {
        println!("Content-Type: {}", content_type);
    } else {
        println!("Content-Type header missing or invalid");
    }

    println!("Form data: {:?}", form);
    let response_message = format!("Hi, {}!", form.email);
    HttpResponse::Ok().body(response_message)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("Starting server...");
    
    HttpServer::new(|| {
        App::new()
            .service(actix_files::Files::new("/", "./static").index_file("index.html"))
            .route("/login_form", web::post().to(login_form))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
