#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle {
            width: 100,
            height: 1,
        },
        Rectangle {
            width: 3,
            height: 1,
        },
        Rectangle {
            width: 7,
            height: 1,
        },
    ];

    list.sort_by_key(|r| r.width);

    println!("{:#?}", list)
}
