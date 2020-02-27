extern crate console_error_panic_hook;
extern crate rust_perlin;

use wasm_bindgen::prelude::*;
use rust_perlin::Perlin2D;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(){
    alert("Hello from wasm");
}

#[wasm_bindgen]
pub fn noise_to_canvas(width: usize, height: usize, frequency: u32, octaves: u32, buffer: &mut[u8]) {
    console_error_panic_hook::set_once();

    let noise = Perlin2D::new(
        frequency,
        octaves,
    );

    for index in 0..(width*height) {
        let gray = noise.noise(
            (index % width) as f32 / width as f32,
            (index / width) as f32 / height as f32
        );

        let gray = (gray * 255f32) as u8;

        buffer[4*index]     = gray;
        buffer[4*index + 1] = gray;
        buffer[4*index + 2] = gray;
        buffer[4*index + 3] = 255u8; //Alpha
    }
}