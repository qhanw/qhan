// fn main() {
//   let x = Some(5);
//   let y = 10;

//   match x {
//       Some(50) => println!("Got 50"),
//       Some(y) => println!("Matched, y = {y}"),
//       _ => println!("Default case, x = {:?}", x),
//   }

//   println!("at the end: x = {:?}, y = {y}", x);
// }
// ------------------------------
// enum Color {
//     Rgb(i32, i32, i32),
//     Hsv(i32, i32, i32),
// }

// enum Message {
//     Quit,
//     Move { x: i32, y: i32 },
//     Write(String),
//     ChangeColor(Color),
// }

// fn main() {
//     let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

//     match msg {
//         Message::ChangeColor(Color::Rgb(r, g, b)) => {
//             println!("Change color to red {r}, green {g}, and blue {b}");
//         }
//         Message::ChangeColor(Color::Hsv(h, s, v)) => {
//             println!("Change color to hue {h}, saturation {s}, value {v}")
//         }
//         _ => (),
//     }
// }

fn main() {
    enum Message {
        Hello { id: i32 },
    }

    let msg = Message::Hello { id: 12 };

    match msg {
        Message::Hello {
            id: id_variable @ 3..=7,
        } => println!("Found an id in range: {}", id_variable),
        Message::Hello { id: 10..=12 } => {
            println!("Found an id in another range")
        }
        Message::Hello { id } => println!("Found some other id: {}", id),
    }
}
