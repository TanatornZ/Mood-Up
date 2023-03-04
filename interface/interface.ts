export interface employee {
  accept_company: boolean;
  company_id: string;
  date_of_birth: Date;
  first_name: string;
  gender: "ชาย" | "หญิง" | "อื่นๆ";
  job_position: string;
  last_name: string;
  line_id: string;
}

export interface employeeNid {
  id: string;
  information: employee ;
}

export interface emotion {
  line_id : string
  date : Object
  comment? : string
  emotion : number
}