interface Achievement {
  id: number;
  name: string;
  category?: Category;
  description?: string;
  points?: number;
  is_account_wide?: boolean;
  criteria: Criteria;
}

interface Key {
  href: string;
}

interface CriteriaAchievement {
  key: Key;
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
}

interface PlayerAchievements {
  achievements: PlayerAchivement[];
}

interface PlayerCriteria {
  id: number;
  is_completed: boolean;
  amount: number;
  child_criteria: ChildCriterum[];
}
interface PlayerAchivement {
  id: number;
  achievement: CriteriaAchievement;
  criteria: PlayerCriteria;
  completed_timestamp: number;
}

interface SettingsType {
  achievementId?: number;
  achievement?: Achievement;
  characterName?: string;
  realmName?: string;
  region?: RegionType;
}

type RegionType = "US" | "EU" | "KR" | "TW" | "CN";
