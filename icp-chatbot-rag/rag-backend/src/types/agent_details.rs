// This is an experimental feature to generate Rust binding from Candid.
// You may want to manually adjust some of the types.
#![allow(dead_code, unused_imports, non_snake_case)]
use candid::{self, CandidType, Decode, Deserialize, Encode, Principal};
use ic_cdk::api::call::CallResult;

#[derive(CandidType, Deserialize)]
pub enum BotVisibility {
    #[serde(rename = "privateVisibility")]
    PrivateVisibility,
    #[serde(rename = "publicVisibility")]
    PublicVisibility,
    #[serde(rename = "unlistedVisibility")]
    UnlistedVisibility,
}

#[derive(CandidType, Deserialize)]
pub struct BotDetails {
    pub id: String,
    pub is_published: bool,
    pub user_id: String,
    pub name: String,
    pub biography: String,
    pub greeting: String,
    pub description: String,
    pub summary: Option<String>,
    pub visibility: BotVisibility,
    pub avatar: String,
}

#[derive(CandidType, Deserialize)]
pub struct Response {
    pub status: candid::Nat,
    pub message: String,
}

#[derive(CandidType, Deserialize)]
pub struct AnalyticsV1 {
    pub messages_replied: candid::Nat,
}

#[derive(CandidType, Deserialize)]
pub enum Analytics {
    #[serde(rename = "v1")]
    V1(AnalyticsV1),
}

#[derive(CandidType, Deserialize)]
pub struct BotDetailsBasic {
    pub id: String,
    pub is_published: bool,
    pub user_id: String,
    pub name: String,
    pub biography: String,
    pub description: String,
    pub avatar: String,
}

candid::define_service!(pub Main : {
  "add_bot" : candid::func!((BotDetails) -> (Response));
  "delete_bot" : candid::func!((String) -> (Response));
  "get_all_analytics" : candid::func!(() -> (Vec<(String, Analytics,)>) query);
  "get_all_bots" : candid::func!(() -> (Vec<BotDetails>));
  "get_analytics" : candid::func!((String) -> (AnalyticsV1) query);
  "get_user_bots" : candid::func!((String) -> (Vec<BotDetailsBasic>) query);
  "get_bot" : candid::func!((String) -> (Option<BotDetails>) query);
  "get_bots" : candid::func!(() -> (Vec<BotDetailsBasic>) query);
  "is_bot_name_valid" : candid::func!((String) -> (bool) query);
  "publish_bot" : candid::func!((String) -> (Response));
  "unpublish_bot" : candid::func!((String) -> (Response));
  "update_message_analytics" : candid::func!((String) -> ());
});
pub struct Service(pub Principal);
impl Service {
    pub async fn add_bot(&self, arg0: BotDetails) -> CallResult<(Response,)> {
        ic_cdk::call(self.0, "add_bot", (arg0,)).await
    }
    pub async fn delete_bot(&self, arg0: String) -> CallResult<(Response,)> {
        ic_cdk::call(self.0, "delete_bot", (arg0,)).await
    }
    pub async fn get_all_analytics(&self) -> CallResult<(Vec<(String, Analytics)>,)> {
        ic_cdk::call(self.0, "get_all_analytics", ()).await
    }
    pub async fn get_all_bots(&self) -> CallResult<(Vec<BotDetails>,)> {
        ic_cdk::call(self.0, "get_all_bots", ()).await
    }
    pub async fn get_analytics(&self, arg0: String) -> CallResult<(AnalyticsV1,)> {
        ic_cdk::call(self.0, "get_analytics", (arg0,)).await
    }
    pub async fn get_user_bots(&self, arg0: String) -> CallResult<(Vec<BotDetailsBasic>,)> {
        ic_cdk::call(self.0, "get_user_bots", (arg0,)).await
    }
    pub async fn get_bot(&self, arg0: String) -> CallResult<(Option<BotDetails>,)> {
        ic_cdk::call(self.0, "get_bot", (arg0,)).await
    }
    pub async fn get_bots(&self) -> CallResult<(Vec<BotDetailsBasic>,)> {
        ic_cdk::call(self.0, "get_bots", ()).await
    }
    pub async fn is_bot_name_valid(&self, arg0: String) -> CallResult<(bool,)> {
        ic_cdk::call(self.0, "is_bot_name_valid", (arg0,)).await
    }
    pub async fn publish_bot(&self, arg0: String) -> CallResult<(Response,)> {
        ic_cdk::call(self.0, "publish_bot", (arg0,)).await
    }
    pub async fn unpublish_bot(&self, arg0: String) -> CallResult<(Response,)> {
        ic_cdk::call(self.0, "unpublish_bot", (arg0,)).await
    }
    pub async fn update_message_analytics(&self, arg0: String) -> CallResult<()> {
        ic_cdk::call(self.0, "update_message_analytics", (arg0,)).await
    }
}
