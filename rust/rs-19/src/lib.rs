// 默认泛型类型参数和运算符重载
use std::ops::Add;

#[derive(Debug, Clone, Copy, PartialEq)]
struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;
    fn add(self, rhs: Meters) -> Self::Output {
        Millimeters(self.0 + rhs.0 * 1000)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn millimeters_add_meters() {
        assert_eq!(Millimeters(10) + Meters(1), Millimeters(1010));
    }
}
