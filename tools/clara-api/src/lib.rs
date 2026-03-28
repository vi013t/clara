pub mod plugin;
pub mod project;
pub mod usersettings;

pub trait BinaryData: Sized
where
    Self: for<'a> serde::Deserialize<'a>,
    Self: serde::Serialize,
{
    fn to_bytes(&self) -> Result<Vec<u8>, String> {
        rmp_serde::to_vec(self).map_err(|e| e.to_string())
    }

    fn from_bytes(bytes: &[u8]) -> Result<Self, String> {
        rmp_serde::from_slice(bytes).map_err(|e| e.to_string())
    }
}
