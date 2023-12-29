use napi_derive::napi;

#[napi]
#[allow(dead_code)]
fn fibonacci(n: u32)->u32{
    match n{
        1|2=> 1,
        _ => fibonacci(n - 1) + fibonacci(n-2)
    }
}