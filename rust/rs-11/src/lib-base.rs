// 基本示例
#[cfg(test)]
mod tests {
    #[test]
    fn exploration() {
        let result = 2 + 2;
        assert_eq!(result, 4)
    }

    #[test]
    fn another() {
        panic!("Make this test fail!")
    }
}
