interface Achievement {
  id: number;
  name: string;
  category?: Category;
  description?: string;
  points?: number;
  is_account_wide?: boolean;
  criteria?: Criteria;
  reward_description?: string;
  reward_item?: RewardItem;
}

interface Key {
  href: string;
}

interface RewardItem {
  id: number;
  key: Key;
  name: string;
}

interface CriteriaAchievement {
  name: string;
  id: number;
}
interface Category {
  key: Key;
  name: string;
  id: number;
}
interface Criteria {
  id: number;
  description: string;
  amount: number;
  operator: Operator;
  child_criteria: ChildCriterum[];
  show_progress_bar: boolean;
}
interface Operator {
  type: string;
  name: string;
}

interface ChildCriterum {
  id: number;
  description: string;
  amount: number;
  achievement?: CriteriaAchievement;
  is_completed?: boolean;
  show_progress_bar: boolean;
  child_criteria?: ChildCriterum[];
}

interface CharacterAchievements {
  achievements: CharacterAchivement[];
}

interface CharacterCriteria {
  id: number;
  is_completed: boolean;
  amount: number;
  child_criteria: ChildCriterum[];
}
interface CharacterAchivement {
  id: number;
  achievement: CriteriaAchievement;
  criteria: CharacterCriteria;
  completed_timestamp: number;
}

interface SettingsType {
  achievementId?: number;
  achievement?: CriteriaAchievement;
  recentAchievements?: CriteriaAchievement[];
  characterName?: string;
  realmName?: string;
  region?: RegionType;
  characterAchievements?: CharacterAchievements;
}

type RegionType = "US" | "EU" | "KR" | "TW" | "CN";
