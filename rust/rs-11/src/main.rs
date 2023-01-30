fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for number in list {
        if number > largest {
            largest = number;
        }
    }

    largest
}

fn main() {
    let number_list = vec![12, 3, 4, 5, 23, 78, 2, 44];
    let result = largest(&number_list);

    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {}", result);
}
