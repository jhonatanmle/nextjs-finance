export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      BankRecord: {
        Row: {
          amount: number | null;
          bank_record_type:
            | Database["public"]["Enums"]["BankRecordType"]
            | null;
          comment: string | null;
          created_at: string;
          currency_type: Database["public"]["Enums"]["CurrencyType"] | null;
          dollar_price: number | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          bank_record_type?:
            | Database["public"]["Enums"]["BankRecordType"]
            | null;
          comment?: string | null;
          created_at?: string;
          currency_type?: Database["public"]["Enums"]["CurrencyType"] | null;
          dollar_price?: number | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          bank_record_type?:
            | Database["public"]["Enums"]["BankRecordType"]
            | null;
          comment?: string | null;
          created_at?: string;
          currency_type?: Database["public"]["Enums"]["CurrencyType"] | null;
          dollar_price?: number | null;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "BankRecord_dollar_price_fkey";
            columns: ["dollar_price"];
            isOneToOne: false;
            referencedRelation: "DollarPrice";
            referencedColumns: ["id"];
          }
        ];
      };
      Category: {
        Row: {
          background_color: string | null;
          created_at: string;
          id: number;
          name: string | null;
          status: boolean | null;
          user_id: string | null;
        };
        Insert: {
          background_color?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          status?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          background_color?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          status?: boolean | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      ConfigurationType: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      Dividends: {
        Row: {
          created_at: string;
          gross_amount: number | null;
          id: number;
          net_amount: number | null;
          taxes_percent: number | null;
          ticket: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          gross_amount?: number | null;
          id?: number;
          net_amount?: number | null;
          taxes_percent?: number | null;
          ticket?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          gross_amount?: number | null;
          id?: number;
          net_amount?: number | null;
          taxes_percent?: number | null;
          ticket?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      DollarPrice: {
        Row: {
          amount: number | null;
          created_at: string;
          currencyType: Database["public"]["Enums"]["CurrencyType"] | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          currencyType?: Database["public"]["Enums"]["CurrencyType"] | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          currencyType?: Database["public"]["Enums"]["CurrencyType"] | null;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
      FinanceRecord: {
        Row: {
          amount: number | null;
          category_id: number | null;
          comment: string | null;
          created_at: string;
          currency_type: Database["public"]["Enums"]["CurrencyType"] | null;
          dollar_price: number | null;
          goal_id: number | null;
          goal_net_amount: number | null;
          id: number;
          payment_type: Database["public"]["Enums"]["PaymentType"] | null;
          record_date: string | null;
          record_type: Database["public"]["Enums"]["RecordType"] | null;
          subcategory_id: number | null;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          category_id?: number | null;
          comment?: string | null;
          created_at?: string;
          currency_type?: Database["public"]["Enums"]["CurrencyType"] | null;
          dollar_price?: number | null;
          goal_id?: number | null;
          goal_net_amount?: number | null;
          id?: number;
          payment_type?: Database["public"]["Enums"]["PaymentType"] | null;
          record_date?: string | null;
          record_type?: Database["public"]["Enums"]["RecordType"] | null;
          subcategory_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          category_id?: number | null;
          comment?: string | null;
          created_at?: string;
          currency_type?: Database["public"]["Enums"]["CurrencyType"] | null;
          dollar_price?: number | null;
          goal_id?: number | null;
          goal_net_amount?: number | null;
          id?: number;
          payment_type?: Database["public"]["Enums"]["PaymentType"] | null;
          record_date?: string | null;
          record_type?: Database["public"]["Enums"]["RecordType"] | null;
          subcategory_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "FinanceRecord_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "FinanceRecord_dollar_price_fkey";
            columns: ["dollar_price"];
            isOneToOne: false;
            referencedRelation: "DollarPrice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "FinanceRecord_goal_id_fkey";
            columns: ["goal_id"];
            isOneToOne: false;
            referencedRelation: "Goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "FinanceRecord_subcategory_id_fkey";
            columns: ["subcategory_id"];
            isOneToOne: false;
            referencedRelation: "Subcategory";
            referencedColumns: ["id"];
          }
        ];
      };
      Goals: {
        Row: {
          completed: boolean | null;
          created_at: string;
          currencyType: Database["public"]["Enums"]["CurrencyType"] | null;
          currentAmount: number | null;
          enabled: boolean | null;
          id: number;
          name: string | null;
          targetAmount: number | null;
          users: string[] | null;
        };
        Insert: {
          completed?: boolean | null;
          created_at?: string;
          currencyType?: Database["public"]["Enums"]["CurrencyType"] | null;
          currentAmount?: number | null;
          enabled?: boolean | null;
          id?: number;
          name?: string | null;
          targetAmount?: number | null;
          users?: string[] | null;
        };
        Update: {
          completed?: boolean | null;
          created_at?: string;
          currencyType?: Database["public"]["Enums"]["CurrencyType"] | null;
          currentAmount?: number | null;
          enabled?: boolean | null;
          id?: number;
          name?: string | null;
          targetAmount?: number | null;
          users?: string[] | null;
        };
        Relationships: [];
      };
      MonthCut: {
        Row: {
          amount: number | null;
          created_at: string;
          date: string | null;
          id: number;
          paid: boolean | null;
          user_id: string | null;
          values: Json | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          paid?: boolean | null;
          user_id?: string | null;
          values?: Json | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          paid?: boolean | null;
          user_id?: string | null;
          values?: Json | null;
        };
        Relationships: [];
      };
      Subcategory: {
        Row: {
          category_id: number | null;
          created_at: string;
          id: number;
          name: string | null;
          status: boolean | null;
          user_id: string | null;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          status?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          category_id?: number | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          status?: boolean | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Subcategory_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          }
        ];
      };
      UserConfig: {
        Row: {
          configuration_type_id: number | null;
          created_at: string;
          enable: boolean | null;
          id: number;
          user_id: string | null;
          value: Json | null;
        };
        Insert: {
          configuration_type_id?: number | null;
          created_at?: string;
          enable?: boolean | null;
          id?: number;
          user_id?: string | null;
          value?: Json | null;
        };
        Update: {
          configuration_type_id?: number | null;
          created_at?: string;
          enable?: boolean | null;
          id?: number;
          user_id?: string | null;
          value?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "UserConfig_configuration_type_id_fkey";
            columns: ["configuration_type_id"];
            isOneToOne: false;
            referencedRelation: "ConfigurationType";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      BankRecordType: "Depósito" | "Retiro" | "Intereses";
      CurrencyType: "PEN" | "USD" | "CLP";
      PaymentType: "Débito" | "Crédito" | "Efectivo";
      RecordType: "Gasto" | "Ingreso" | "Préstamo" | "Intereses";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
