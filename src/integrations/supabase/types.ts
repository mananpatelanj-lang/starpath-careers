export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      allowed_domains: {
        Row: {
          domain: string
        }
        Insert: {
          domain: string
        }
        Update: {
          domain?: string
        }
        Relationships: []
      }
      blocked_domains: {
        Row: {
          created_at: string
          domain: string
        }
        Insert: {
          created_at?: string
          domain: string
        }
        Update: {
          created_at?: string
          domain?: string
        }
        Relationships: []
      }
      career_data: {
        Row: {
          ai_resistance: string
          bhagyank_name: string
          careers: string[]
          challenges: string
          combination_code: string
          created_at: string | null
          financial_potential: string
          industry_focus: string
          market_demand: string
          mulank_name: string
          special_insight: string
          strengths: string
          success_formula: string
        }
        Insert: {
          ai_resistance: string
          bhagyank_name: string
          careers: string[]
          challenges: string
          combination_code: string
          created_at?: string | null
          financial_potential: string
          industry_focus: string
          market_demand: string
          mulank_name: string
          special_insight: string
          strengths: string
          success_formula: string
        }
        Update: {
          ai_resistance?: string
          bhagyank_name?: string
          careers?: string[]
          challenges?: string
          combination_code?: string
          created_at?: string | null
          financial_potential?: string
          industry_focus?: string
          market_demand?: string
          mulank_name?: string
          special_insight?: string
          strengths?: string
          success_formula?: string
        }
        Relationships: []
      }
      legal_content: {
        Row: {
          content: string
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      numerology_numbers: {
        Row: {
          career_paths: string[]
          compatible_numbers: number[]
          created_at: string
          description: string
          id: string
          life_path_guidance: string
          lucky_colors: string[]
          name: string
          number: number
          personality_traits: string
          strengths: string[]
          title: string
          weaknesses: string[]
        }
        Insert: {
          career_paths: string[]
          compatible_numbers: number[]
          created_at?: string
          description: string
          id?: string
          life_path_guidance: string
          lucky_colors: string[]
          name: string
          number: number
          personality_traits: string
          strengths: string[]
          title: string
          weaknesses: string[]
        }
        Update: {
          career_paths?: string[]
          compatible_numbers?: number[]
          created_at?: string
          description?: string
          id?: string
          life_path_guidance?: string
          lucky_colors?: string[]
          name?: string
          number?: number
          personality_traits?: string
          strengths?: string[]
          title?: string
          weaknesses?: string[]
        }
        Relationships: []
      }
      professions: {
        Row: {
          bhagyank: number
          bhagyank_name: string
          combination_code: string
          created_at: string
          id: string
          mulank: number
          mulank_name: string
          professions: string[]
        }
        Insert: {
          bhagyank: number
          bhagyank_name: string
          combination_code: string
          created_at?: string
          id?: string
          mulank: number
          mulank_name: string
          professions: string[]
        }
        Update: {
          bhagyank?: number
          bhagyank_name?: string
          combination_code?: string
          created_at?: string
          id?: string
          mulank?: number
          mulank_name?: string
          professions?: string[]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          last_unlock_date: string | null
          unlocked_combinations: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_unlock_date?: string | null
          unlocked_combinations?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_unlock_date?: string | null
          unlocked_combinations?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      query_history: {
        Row: {
          bhagyank: number
          created_at: string
          day: number
          id: string
          month: number
          mulank: number
          user_id: string
          year: number
        }
        Insert: {
          bhagyank: number
          created_at?: string
          day: number
          id?: string
          month: number
          mulank: number
          user_id: string
          year: number
        }
        Update: {
          bhagyank?: number
          created_at?: string
          day?: number
          id?: string
          month?: number
          mulank?: number
          user_id?: string
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
