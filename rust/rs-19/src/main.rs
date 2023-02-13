fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}
fn main() {
    let answer = do_twice(add_one, 5);
    println!("The answer is: {}", answer);

    // ----

    let list_of_numbers1 = vec![1, 2, 3];
    let list_of_strings1: Vec<String> = list_of_numbers1.iter().map(|i| i.to_string()).collect();

    println!("List of string1:  {}", list_of_strings1.join(","));

    // -----
    let list_of_numbers2 = vec![1, 2, 3];
    let list_of_strings2: Vec<String> = list_of_numbers2.iter().map(ToString::to_string).collect();
    println!("List of string1:  {}", list_of_strings2.join(","));

    // -----

    enum Status {
        Value(u32),
        Stop,
    }

    let list_of_statuses: Vec<Status> = (0u32..20).map(Status::Value).collect();

    // println!("List of statues {:?}", list_of_statuses)
}
